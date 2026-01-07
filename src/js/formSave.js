
function initFormSave() {
    const form = document.querySelector('form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    const formId = form.id || 'form';
    
   
    const savedData = localStorage.getItem(`formData_${formId}`);
    if (savedData) {
        const data = JSON.parse(savedData);
        inputs.forEach(input => {
            if (data[input.id]) {
                input.value = data[input.id];
            }
        });
    }
    
   
    let saveTimeout;
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                const data = {};
                inputs.forEach(inp => {
                    data[inp.id] = inp.value;
                });
                localStorage.setItem(`formData_${formId}`, JSON.stringify(data));
                showSavedNotification();
            }, 500); 
        });
    });
    
    
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.textContent = 'Clear Saved Data';
    clearButton.style.marginTop = '1rem';
    form.appendChild(clearButton);
    
    clearButton.addEventListener('click', () => {
        localStorage.removeItem(`formData_${formId}`);
        inputs.forEach(input => {
            input.value = '';
        });
    });
}

function showSavedNotification() {
    let notification = document.querySelector('.saved-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'saved-notification';
        notification.textContent = 'Saved!';
        document.body.appendChild(notification);
    }
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}


window.addEventListener('load', initFormSave);