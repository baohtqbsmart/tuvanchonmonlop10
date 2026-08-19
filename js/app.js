(function () {
  "use strict";

  const answers = {}; // { questionId: value(1-5) }
  const ALL_QUESTIONS_COUNT = QUESTIONS.length + ELECTIVE_QUESTIONS.length;

  const introScreen = document.getElementById("intro-screen");
  const surveyScreen = document.getElementById("survey-screen");
  const resultScreen = document.getElementById("result-screen");
  const surveyForm = document.getElementById("survey-form");
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");

  function showScreen(screen) {
    [introScreen, surveyScreen, resultScreen].forEach((s) => s.classList.remove("active"));
    screen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function buildLikertRow(question) {
    const wrap = document.createElement("div");
    wrap.className = "question-block";

    const p = document.createElement("p");
    p.className = "question-text";
    p.textContent = question.text;
    wrap.appendChild(p);

    const options = document.createElement("div");
    options.className = "likert-options";

    LIKERT_LABELS.forEach((label, idx) => {
      const value = idx + 1;
      const optId = `${question.id}_opt${value}`;
      const optLabel = document.createElement("label");
      optLabel.className = "likert-option";
      optLabel.setAttribute("for", optId);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.id = optId;
      input.value = String(value);

      input.addEventListener("change", () => {
        answers[question.id] = value;
        options.querySelectorAll(".likert-option").forEach((el) => el.classList.remove("selected"));
        optLabel.classList.add("selected");
        updateProgress();
      });

      const num = document.createElement("span");
      num.className = "likert-num";
      num.textContent = String(value);

      const text = document.createElement("span");
      text.textContent = label;

      optLabel.appendChild(input);
      optLabel.appendChild(num);
      optLabel.appendChild(text);
      options.appendChild(optLabel);
    });

    wrap.appendChild(options);
    return wrap;
  }

  function renderSurvey() {
    surveyForm.innerHTML = "";

    SECTION_GROUPS.forEach((group) => {
      const block = document.createElement("div");
      block.className = "section-block";

      const heading = document.createElement("h3");
      heading.textContent = group.title;
      block.appendChild(heading);

      group.clusters.forEach((clusterId) => {
        QUESTIONS.filter((q) => q.cluster === clusterId).forEach((q) => {
          block.appendChild(buildLikertRow(q));
        });
      });

      surveyForm.appendChild(block);
    });

    const electiveBlock = document.createElement("div");
    electiveBlock.className = "section-block";
    const electiveHeading = document.createElement("h3");
    electiveHeading.textContent = "10. Cảm nhận của em về hai môn học lựa chọn";
    electiveBlock.appendChild(electiveHeading);
    ELECTIVE_QUESTIONS.forEach((q) => {
      electiveBlock.appendChild(buildLikertRow(q));
    });
    surveyForm.appendChild(electiveBlock);
  }

  function updateProgress() {
    const answered = Object.keys(answers).length;
    const pct = Math.round((answered / ALL_QUESTIONS_COUNT) * 100);
    progressFill.style.width = `${pct}%`;
    progressText.textContent = `${answered} / ${ALL_QUESTIONS_COUNT}`;
  }

  function computeClusterScores() {
    // raw sum per cluster (max 20, from 4 questions x 5)
    const scores = {};
    CLUSTERS.forEach((c) => (scores[c.id] = 0));
    QUESTIONS.forEach((q) => {
      scores[q.cluster] += answers[q.id] || 0;
    });
    return scores; // cluster.id -> raw sum (0-20)
  }

  function computeResults() {
    const clusterScores = computeClusterScores();

    const ranked = CLUSTERS
      .map((c) => ({ ...c, raw: clusterScores[c.id], pct: Math.round((clusterScores[c.id] / 20) * 100) }))
      .sort((a, b) => b.raw - a.raw);

    const top5 = ranked.slice(0, 5);

    // Điểm cảm nhận trực tiếp Hóa / Địa
    const hoaDirect = (answers["hoa_1"] || 0) + (answers["hoa_2"] || 0); // max 10
    const diaDirect = (answers["dia_1"] || 0) + (answers["dia_2"] || 0); // max 10
    const hoaDirectPct = (hoaDirect / 10) * 100;
    const diaDirectPct = (diaDirect / 10) * 100;

    // Trọng số giảm dần theo thứ hạng ngành phù hợp (top1 ảnh hưởng nhiều nhất)
    const rankWeights = [1.0, 0.8, 0.6, 0.4, 0.2];
    let hoaClusterScore = 0;
    let diaClusterScore = 0;
    top5.forEach((c, idx) => {
      const contribution = c.pct * rankWeights[idx];
      if (c.scienceElective === "hoa") hoaClusterScore += contribution;
      else diaClusterScore += contribution;
    });

    // Cảm nhận trực tiếp được nhân đôi trọng số vì phản ánh sát nhất khả năng học môn đó tại trường
    const finalHoa = hoaDirectPct * 2 + hoaClusterScore;
    const finalDia = diaDirectPct * 2 + diaClusterScore;
    const totalFinal = finalHoa + finalDia || 1;
    const hoaSharePct = Math.round((finalHoa / totalFinal) * 100);
    const diaSharePct = 100 - hoaSharePct;

    const recommended = finalHoa >= finalDia ? "hoa" : "dia";

    return {
      top5,
      hoaDirectPct,
      diaDirectPct,
      hoaSharePct,
      diaSharePct,
      recommended
    };
  }

  function renderResults() {
    const { top5, hoaSharePct, diaSharePct, recommended } = computeResults();

    // 1. Majors
    const majorsList = document.getElementById("majors-list");
    majorsList.innerHTML = "";
    top5.forEach((m) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="major-name">${m.major}</div>
        <div class="major-meta">${m.summary}</div>
        <div class="match-bar-wrap"><div class="match-bar" style="width:${m.pct}%"></div></div>
        <div class="major-meta">Mức độ phù hợp: ${m.pct}%</div>
      `;
      majorsList.appendChild(li);
    });

    // 2. Universities table (1 major = 1 dòng, trường đầu tiên là gợi ý chính)
    const tbody = document.querySelector("#university-table tbody");
    tbody.innerHTML = "";
    top5.forEach((m) => {
      const tr = document.createElement("tr");
      const primaryUni = m.universities[0].name;
      const others = m.universities.slice(1, 3).map((u) => u.name).join("; ");
      tr.innerHTML = `
        <td><strong>${m.major}</strong></td>
        <td>${primaryUni}<br><span style="color:#64748b;font-size:0.82rem;">Lựa chọn khác: ${others}</span></td>
      `;
      tbody.appendChild(tr);
    });

    // 3. Elective subject
    const electiveDiv = document.getElementById("elective-result");
    const subjectName = recommended === "hoa" ? "Hóa học" : "Địa lý";
    const badgeClass = recommended;

    const topScienceType = top5[0] ? top5[0].scienceElective : recommended;
    const reasonMajor = top5[0] ? top5[0].major : "";

    electiveDiv.innerHTML = `
      <span class="elective-badge ${badgeClass}">Nên đăng ký: ${subjectName}</span>
      <div class="elective-compare">
        <div class="elective-row hoa">
          <span class="label">Hóa học</span>
          <div class="bar-wrap"><div class="bar" style="width:${hoaSharePct}%"></div></div>
          <span class="pct">${hoaSharePct}%</span>
        </div>
        <div class="elective-row dia">
          <span class="label">Địa lý</span>
          <div class="bar-wrap"><div class="bar" style="width:${diaSharePct}%"></div></div>
          <span class="pct">${diaSharePct}%</span>
        </div>
      </div>
      <p class="elective-reason">
        Ngành phù hợp nhất với em là <strong>${reasonMajor}</strong>, thuộc nhóm ngành thường xét tuyển
        và học tập gắn liền với môn <strong>${topScienceType === "hoa" ? "Hóa học" : "Địa lý"}</strong>.
        Kết hợp với cảm nhận của em về mức độ yêu thích và khả năng học hai môn này, môn học lựa chọn
        phù hợp nhất để đăng ký tại trường là <strong>${subjectName}</strong>.
      </p>
    `;

    const resultSub = document.getElementById("result-sub");
    const name = document.getElementById("student-name").value.trim();
    const klass = document.getElementById("student-class").value.trim();
    let who = "";
    if (name) who += name;
    if (klass) who += (who ? " - Lớp " : "Lớp ") + klass;
    resultSub.textContent = who ? `Kết quả dành cho: ${who}` : "";
  }

  function allAnswered() {
    return Object.keys(answers).length >= ALL_QUESTIONS_COUNT;
  }

  document.getElementById("start-btn").addEventListener("click", () => {
    renderSurvey();
    updateProgress();
    showScreen(surveyScreen);
  });

  document.getElementById("submit-btn").addEventListener("click", () => {
    if (!allAnswered()) {
      const missing = ALL_QUESTIONS_COUNT - Object.keys(answers).length;
      alert(`Em còn ${missing} câu chưa trả lời. Vui lòng hoàn thành tất cả các câu hỏi trước khi xem kết quả.`);
      return;
    }
    renderResults();
    showScreen(resultScreen);
  });

  document.getElementById("retake-btn").addEventListener("click", () => {
    Object.keys(answers).forEach((k) => delete answers[k]);
    showScreen(introScreen);
  });

  document.getElementById("print-btn").addEventListener("click", () => {
    window.print();
  });
})();
