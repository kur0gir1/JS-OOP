document.addEventListener("DOMContentLoaded", () => {
  const enrollmentForm = document.getElementById("enrollmentForm");
  const enrollmentTableBody = document.getElementById("enrollmentTableBody");

  let enrollments = [];
  let editIndex = null;

  const subjectsData = {
    BSIT: ["Introduction to HCI", "Discrete Mathematics", "Object Oriented Programming" ,"Web Development", "Data Structures"],
    BSARCH: ["Design", "Statics of Rigid Bodies", "Building Technologies", "Building Utilities", "History of Architecture"]
  };

  const scheduleData = {
    // IT SUBJECTS
      "Introduction to HCI": ["MW", "TTh"],
      "Discrete Mathematics": ["MW", "TTh"],
      "Object Oriented Programming": ["MW", "TTh"],
      "Web Development": ["MW", "TTh"],
      "Data Structures": ["TTh", "Sat"],

    // ARCHITECTURE SUBJECTS
      "Design": ["MW", "TTh"],
      "Statics of Rigid Bodies": ["MW", "TTh"],
      "Building Technologies": ["MW", "Sat"],
      "Building Utilities": ["TTh", "Sat"],
      "History of Architecture": ["MW", "Sat"]
  };

  const timeData = {
    MW: ["7:30 AM - 9 AM","9 AM - 10:30 AM","10:30 AM - 12:00 PM", "1:30 PM - 3 PM", "3 PM - 5 PM", "5 PM - 6:30 PM"],
    TTh: ["10:30 AM - 12 PM", "1:30 PM - 4 PM", "5 PM - 7:30 PM"],
    F:["11 AM - 1:30 PM", "1:30 PM - 4 PM", "4 PM - 6:30 PM"],
    Sat: ["9 AM - 12 PM", "1 PM - 4 PM", "4 PM - 7 PM"],
  };

  const unitsData = {
    //IT SUBJECTS
    "Introduction to HCI": 2,
    "Discrete Mathematics": 2,
    "Object Oriented Programming": 3,
    "Web Development": 3,
    "Data Structures": 3,

    // ARCHITECTURE SUBJECTS
    "Design": 3,
    "Statics of Rigid Bodies": 3,
    "Building Technologies": 2,
    "Building Utilities": 2,
    "History of Architecture": 3
  };

  document.getElementById("courses").addEventListener("change", (e) => {
    const selectedCourse = e.target.value;
    const subjects = subjectsData[selectedCourse] || [];

    const subjectSelect = document.getElementById("subjects");
    const scheduleSelect = document.getElementById("schedule");
    const timeSelect = document.getElementById("time");

    clearDropdown(subjectSelect);
    clearDropdown(scheduleSelect);
    clearDropdown(timeSelect);
    
    subjects.forEach(subject => {
      subjectSelect.innerHTML += `<option value="${subject}">${subject}</option>`;
    });
  });

  document.getElementById("subjects").addEventListener("change", (e) => {
    const selectedSubject = e.target.value;
    const units = unitsData[selectedSubject] || 0;
    const schedules = scheduleData[selectedSubject] || [];

    const scheduleSelect = document.getElementById("schedule");
    const timeSelect = document.getElementById("time");

    clearDropdown(scheduleSelect);
    clearDropdown(timeSelect);

    schedules.forEach(sched => {
      scheduleSelect.innerHTML += `<option value="${sched}">${sched}</option>`;
    });

    document.getElementById("numberOfUnits").value = units;
  });

  document.getElementById("schedule").addEventListener("change", (e) => {
    const selectedSchedule = e.target.value;
    const times = timeData[selectedSchedule] || [];
    const timeSelect = document.getElementById("time");

    clearDropdown(timeSelect);

    times.forEach(time => {
      timeSelect.innerHTML += `<option value="${time}">${time}</option>`;
    });
  });

  function clearDropdown(dropdown) {
    dropdown.innerHTML = '<option value="" selected disabled hidden>Select an option</option>';
  }

  enrollmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(enrollmentForm);
    const classTypes = [];
    if (formData.getAll("classType").includes("Lec")) classTypes.push("Lecture");
    if (formData.getAll("classType").includes("Lab")) classTypes.push("Laboratory");

    const newEntry = {
      studentName: formData.get("studentName"),
      course: formData.get("courses"),
      subject: formData.get("subjects"),
      schedule: formData.get("schedule"),
      time: formData.get("time"),
      numberOfUnits: parseInt(formData.get("numberOfUnits")),
      classType: classTypes.join(" & "),
      labFee: parseFloat(formData.get("labFee")),
      pricePerUnit: parseFloat(formData.get("pricePerUnit")),
      downPayment: parseFloat(formData.get("downPayment"))
    };

    if (editIndex !== null) {
      enrollments[editIndex] = newEntry;
      editIndex = null;
    } else {
      enrollments.push(newEntry);
    }

    enrollmentForm.reset();
    renderTable();
    calculatePayments();
  });

  function renderTable() {
    enrollmentTableBody.innerHTML = "";
    enrollments.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.studentName}</td>
        <td>${entry.course}</td>
        <td>${entry.subject}</td>
        <td>${entry.schedule}</td>
        <td>${entry.time}</td>
        <td>${entry.numberOfUnits}</td>
        <td>${entry.classType}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editEntry(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteEntry(${index})">Delete</button>
        </td>
      `;
      enrollmentTableBody.appendChild(row);
    });
  }

  window.editEntry = function (index) {
    const entry = enrollments[index];
    document.getElementById("studentName").value = entry.studentName;
    document.getElementById("pricePerUnit").value = entry.pricePerUnit;
    document.getElementById("downPayment").value = entry.downPayment;
    document.getElementById("courses").value = entry.course;
    document.getElementById("addCourse").innerText = "Update Course";
    document.getElementById("addCourse").classList.remove("btn-primary");
    document.getElementById("addCourse").classList.add("btn-warning");
    document.getElementById("addCourse").setAttribute("data-index", index);

    enrollmentForm.addEventListener("reset", () => {
      document.getElementById("addCourse").innerText = "Add Course";
      document.getElementById("addCourse").classList.remove("btn-warning");
      document.getElementById("addCourse").classList.add("btn-primary");
      document.getElementById("addCourse").removeAttribute("data-index");
    });

    const event = new Event("change");
    document.getElementById("courses").dispatchEvent(event);

    setTimeout(() => {
      document.getElementById("subjects").value = entry.subject;
      document.getElementById("subjects").dispatchEvent(event);

      setTimeout(() => {
        document.getElementById("schedule").value = entry.schedule;
        document.getElementById("schedule").dispatchEvent(event);

        setTimeout(() => {
          document.getElementById("time").value = entry.time;
        }, 100);
      }, 100);
    }, 100);

    document.getElementById("numberOfUnits").value = entry.numberOfUnits;
    document.getElementById("labFee").value = entry.labFee;

    document.getElementById("lec").checked = entry.classType.includes("Lecture");
    document.getElementById("lab").checked = entry.classType.includes("Laboratory");

    editIndex = index;
  };

  window.deleteEntry = function (index) {
    if (confirm("Are you sure you want to delete this course?")) {
      enrollments.splice(index, 1);
      renderTable();
      calculatePayments();
    }
  };

  function calculatePayments() {
    let totalUnits = 0;
    let totalLabFee = 0;
    let totalTuition = 0;

    enrollments.forEach(entry => {
      totalUnits += entry.numberOfUnits;
      totalLabFee += entry.classType.includes("Laboratory") ? entry.labFee : 0;
      totalTuition += (entry.numberOfUnits * entry.pricePerUnit) + totalLabFee;
    });

    const perExam = (totalTuition + totalLabFee - (enrollments[0]?.downPayment || 0)) / 3;

    document.getElementById("totalUnits").innerText = `${totalUnits} Units`;
    document.getElementById("totalLabFee").innerText = `₱${totalLabFee}`;
    document.getElementById("totalTuitionFee").innerText = `₱${totalTuition}`;
    document.getElementById("paymentPerExam").innerText = `₱${perExam.toFixed(2)}`;
  }
});
