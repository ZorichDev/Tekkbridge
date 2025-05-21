// ===============================================
// functions
// open function
const OpenFunction = (div, classes) => {
  div.classList.add(classes);
};

// close function
const CloseFunction = (div, classes) => {
  div.classList.remove(classes);
};

const ToggleFunction = (div, classes) => {
  div.classList.toggle(classes);
};

// ===================================================
// nav elements
const nav_toggle_btn = document.querySelector(".nav_toggle");
const nav_container = document.querySelector(".nav_container");
const mobile_nav = document.querySelector(".mobile_nav");
const Mobile_nav_container = document.querySelector(".mobile_nav_container");

// Mobile nav functionality
nav_toggle_btn.addEventListener("click", (e) => {
  const currentIcon = e.target;

  // change toggle icon
  ToggleFunction(nav_toggle_btn, "toggle_nav");

  // get mobile nav container height
  const height = Mobile_nav_container.getBoundingClientRect().height;

  const navInitialHeight = mobile_nav.getBoundingClientRect().height;

  if (currentIcon.classList.contains("fa-bars")) {
    OpenFunction(nav_container, "nav_bg");
    nav_container.style.height = `calc(${height}px + 1rem)`;
  } else {
    CloseFunction(nav_container, "nav_bg");
    nav_container.style.height = `calc(${navInitialHeight}px + 1rem)`;
  }
});

window.addEventListener("scroll", () => {
  // =================================================
  // nav scroll functionality
  if (window.scrollY > 40) {
    OpenFunction(nav_container, "nav_bg");
  } else {
    CloseFunction(nav_container, "nav_bg");
  }
  // ===================================================
});

// =======================================================
// slider elements
let index = 0;
const next_btn = document.querySelector(".next_slide");
const prev_btn = document.querySelector(".prev_slide");
const slide_img = document.querySelectorAll(".slide_img");
const slider_title = document.querySelector(".slider_title");
const slide_element = document.querySelector(".slider_container");
const slide_detail_text = document.querySelector(".slide_detail_text");
const slide_detail_title = document.querySelector(".slide_detail_title");
const slide_img_container = document.querySelector(".slide_img_container");

const localData = async () => {
  const resp = await fetch("./data.json");
  const data = await resp.json();

  const upDated = () => {
    // change image functionality
    data.forEach(({ Logo }, index) => {
      if (slide_img[index]) {
        slide_img[index].src = Logo;
      }
    });

    // slide functionality
    const { topName, title, backgroundImg, subText, activeLogo } = data[index];

    // setting up the html for the slide once page loads
    slide_img[index].src = activeLogo;
    slider_title.textContent = topName;
    slide_detail_title.textContent = title;
    slide_detail_text.textContent = subText;

    slide_element.style.background = `linear-gradient(
          to top,
          rgba(0, 0, 0, 0.15),
          rgba(0, 0, 0, 0.25),
          rgba(0, 0, 0, 0.35)
        ),
        url(${backgroundImg}) center/cover, no-repeat`;
  };

  upDated();

  // next btn functionality
  next_btn.addEventListener("click", () => {
    index++;
    if (index > data.length - 1) {
      index = 0;
    }
    upDated();
  });

  // prev btn functionality
  prev_btn.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = data.length - 1;
    }
    upDated();
  });
};

slide_img.forEach((slideImage, Index) => {
  slideImage.addEventListener("click", () => {
    index = Index;
    localData();
  });
});

// ========================================================
// our teacher  elements
const our_teacher_container = document.querySelector(".our_teachers_container");

const TeacherApi = async () => {
  const resp = await fetch("./LocalApi.json");
  const { ourTeachers } = await resp.json();

  // create our teacher content
  const displayContent = ourTeachers
    .map(({ name, course, profile, icon }) => {
      return `<div class="our_teacher_content">


              <div class="our_teacher_profile_container">
              
                <img
                  src=${profile}
                  alt="our_teacher_profile"
                  class="our_teacher_profile"
                />

           
                <div class="teachers_link_container">
                 
                  <div class="teacher_link">
                    

                  ${icon.map((socialIcon) => {
                    return `<div class="social_icon">${socialIcon}</div>`;
                  })}
                    
                  </div>
                </div>
              </div>

             
              <h3 class="teacher_name">${name}</h3>

             
              <p class="teacher_profession">${course}</p>
            </div>`;
    })
    .join("");
  our_teacher_container.innerHTML = displayContent;
};

// ========================================================
// testimony element
const testimony_container = document.querySelector(".testimonies_container");

const showTestimony = async () => {
  const resp = await fetch("./LocalApi.json");
  const { Testimonies } = await resp.json();

  const displayTestimony = Testimonies.map(
    ({ stars, testimony, picture, name, student }) => {
      return `
      
      <div class="testimony_container">
              <!-- =============================================== -->
              <!-- star container -->
              <div class="star_container">

              ${stars
                .map(() => {
                  return `<i class="fa-solid fa-star"></i>`;
                })
                .join("")}
                
              </div>

              <!-- =============================================== -->
              <!-- our student testimony -->
              <p class="our_student_testimony">
               ${testimony}
              </p>

              <!-- =============================================== -->
              <!-- student details container -->
              <div class="student_details_container">
                <!-- =============================================== -->
                <!-- student profile -->
                <img
                  src=${picture}
                  alt="student_profile"
                  class="student_profile"
                />

                <!-- =============================================== -->
                <!-- student details -->
                <div class="student_details">
                  <!-- =============================================== -->
                  <!-- students name -->
                  <h3 class="student_name">${name}</h3>

                  <!-- =============================================== -->
                  <!-- student -->
                  <h4 class="student">${student}</h4>
                </div>
              </div>
            </div>
      `;
    }
  ).join("");
  testimony_container.innerHTML = displayTestimony;
};

window.addEventListener("DOMContentLoaded", () => {
  localData();
  TeacherApi();
  showTestimony();
});
