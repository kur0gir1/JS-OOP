/**
 * Profile Picture Management for Employee Inheritance System
 */

document.addEventListener('DOMContentLoaded', () => {
  // Handle profile card rendering
  const originalRenderEmployeeCard = window.renderEmployeeCard;
  
  if (typeof originalRenderEmployeeCard === 'function') {
    window.renderEmployeeCard = function(emp) {
      // Call the original render function
      const result = originalRenderEmployeeCard(emp);
      
      // Get the last added card
      const cards = document.querySelectorAll('.card');
      const currentCard = cards[cards.length - 1];
      
      if (!currentCard) return result;
      
      // Apply profile image and icon
      const employeeData = emp.getEmployee();
      const profileImage = currentCard.querySelector('.profile-image');
      const profileIcon = currentCard.querySelector('.profile-icon');
      
      if (employeeData.profileColor && profileImage) {
        profileImage.classList.add(employeeData.profileColor);
      }
      
      if (employeeData.profileIcon && profileIcon) {
        profileIcon.classList.remove('bi-person-circle');
        profileIcon.classList.add(employeeData.profileIcon);
      }
      
      // Add change profile functionality
      const changeProfileBtn = currentCard.querySelector('.change-profile-btn');
      if (changeProfileBtn) {
        changeProfileBtn.addEventListener('click', () => showProfileModal(emp, currentCard));
      }
      
      return result;
    };
  } else {
    console.warn('Original renderEmployeeCard function not found');
  }
  
  // Add event listeners to profile color options
  document.querySelectorAll('.profile-color-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.profile-color-option').forEach(opt => {
        opt.style.border = 'none';
      });
      this.style.border = '3px solid white';
    });
  });
  
  // Add event listeners to profile icon options
  document.querySelectorAll('.profile-icon-option').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.profile-icon-option').forEach(opt => {
        opt.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  // Profile modal functionality
  function showProfileModal(employee, cardElement) {
    const profileModal = document.getElementById('profileModal');
    if (!profileModal) {
      createProfileModal();
      return showProfileModal(employee, cardElement);
    }
    
    const bsModal = new bootstrap.Modal(profileModal);
    
    // Clear previous selections
    document.querySelectorAll('.profile-color-option').forEach(option => {
      option.style.border = 'none';
    });
    
    document.querySelectorAll('.profile-icon-option').forEach(option => {
      option.classList.remove('active');
    });
    
    // Mark current selections
    const employeeData = employee.getEmployee();
    const currentColor = employeeData.profileColor;
    const currentIcon = employeeData.profileIcon;
    
    if (currentColor) {
      const colorOption = document.querySelector(`.profile-color-option[data-color="${currentColor}"]`);
      if (colorOption) colorOption.style.border = '3px solid white';
    }
    
    if (currentIcon) {
      const iconOption = document.querySelector(`.profile-icon-option[data-icon="${currentIcon}"]`);
      if (iconOption) iconOption.classList.add('active');
    }
    
    // Handle save button click
    const saveBtn = document.getElementById('save-profile');
    
    // Remove any previous event listeners
    const newSaveBtn = saveBtn.cloneNode(true);
    saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
    
    newSaveBtn.addEventListener('click', function() {
      const selectedColor = document.querySelector('.profile-color-option[style*="border: 3px solid white"]');
      const selectedIcon = document.querySelector('.profile-icon-option.active');
      
      let newColor = selectedColor ? selectedColor.dataset.color : null;
      let newIcon = selectedIcon ? selectedIcon.dataset.icon : null;
      
      // Update the employee object
      if (newColor) employee.setProfileColor(newColor);
      if (newIcon) employee.setProfileIcon(newIcon);
      
      // Update the card
      const profileImage = cardElement.querySelector('.profile-image');
      const profileIcon = cardElement.querySelector('.profile-icon');
      
      // Remove all color classes
      ['profile-color-1', 'profile-color-2', 'profile-color-3', 
       'profile-color-4', 'profile-color-5', 'profile-color-6'].forEach(cls => {
        if (profileImage) profileImage.classList.remove(cls);
      });
      
      // Add new color class
      if (newColor && profileImage) {
        profileImage.classList.add(newColor);
      }
      
      // Update icon
      if (newIcon && profileIcon) {
        profileIcon.className = 'bi ' + newIcon + ' profile-icon';
      }
      
      // Close modal
      bsModal.hide();
    });
    
    // Show the modal
    bsModal.show();
  }
  
  // Create profile modal if it doesn't exist
  function createProfileModal() {
    const modalHTML = `
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-light border-light">
          <div class="modal-header">
            <h5 class="modal-title" id="profileModalLabel">Change Profile</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6>Profile Color</h6>
            <div class="d-flex flex-wrap gap-2 mb-4">
              <div class="profile-color-option profile-color-1" data-color="profile-color-1" style="width:50px; height:50px; border-radius:50%; cursor:pointer;"></div>
              <div class="profile-color-option profile-color-2" data-color="profile-color-2" style="width:50px; height:50px; border-radius:50%; cursor:pointer;"></div>
              <div class="profile-color-option profile-color-3" data-color="profile-color-3" style="width:50px; height:50px; border-radius:50%; cursor:pointer;"></div>
              <div class="profile-color-option profile-color-4" data-color="profile-color-4" style="width:50px; height:50px; border-radius:50%; cursor:pointer;"></div>
              <div class="profile-color-option profile-color-5" data-color="profile-color-5" style="width:50px; height:50px; border-radius:50%; cursor:pointer;"></div>
              <div class="profile-color-option profile-color-6" data-color="profile-color-6" style="width:50px; height:50px; border-radius:50%; cursor:pointer;"></div>
            </div>
            
            <h6>Profile Icon</h6>
            <div class="d-flex flex-wrap gap-3 mb-3">
              <button class="btn btn-outline-light profile-icon-option" data-icon="bi-person">
                <i class="bi bi-person"></i>
              </button>
              <button class="btn btn-outline-light profile-icon-option" data-icon="bi-briefcase">
                <i class="bi bi-briefcase"></i>
              </button>
              <button class="btn btn-outline-light profile-icon-option" data-icon="bi-code-square">
                <i class="bi bi-code-square"></i>
              </button>
              <button class="btn btn-outline-light profile-icon-option" data-icon="bi-terminal">
                <i class="bi bi-terminal"></i>
              </button>
              <button class="btn btn-outline-light profile-icon-option" data-icon="bi-cpu">
                <i class="bi bi-cpu"></i>
              </button>
              <button class="btn btn-outline-light profile-icon-option" data-icon="bi-star">
                <i class="bi bi-star"></i>
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="save-profile">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners to the newly created elements
    document.querySelectorAll('.profile-color-option').forEach(option => {
      option.addEventListener('click', function() {
        document.querySelectorAll('.profile-color-option').forEach(opt => {
          opt.style.border = 'none';
        });
        this.style.border = '3px solid white';
      });
    });
    
    document.querySelectorAll('.profile-icon-option').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.profile-icon-option').forEach(opt => {
          opt.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  }
});
