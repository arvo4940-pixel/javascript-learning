
// Get HTML elements

const promiseBtn = document.getElementById("promiseBtn");
const asyncBtn = document.getElementById("asyncBtn");

const promiseResult = document.getElementById("promiseResult");
const asyncResult = document.getElementById("asyncResult");


// Student Information

function getStudent() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const student = {
                name: "Arvo",
                age: 19,
                subject: "JavaScript",
                level: "Beginner"
            };

            const shouldSucceed = student.age >= 18;

            if (shouldSucceed) {
                resolve(student);
            } else {
                reject("Failed to load student information.");
            }
        }, 2000);

    });

}


// 1. PROMISE CHAINING

promiseBtn.addEventListener("click", function () {

    promiseBtn.disabled = true;

    promiseResult.innerHTML = `
        <p class="loading">Loading student information...</p>
        <div class="loader"></div>
    `;

    getStudent()

        .then((student) => {

            promiseResult.innerHTML = `
                <p class="success">Step 1: Student loaded!</p>
                <p>Name: ${student.name}</p>
            `;

            return student;

        })

        .then((student) => {

            promiseResult.innerHTML += `
                <p>Age: ${student.age}</p>
            `;

            return student;

        })

        .then((student) => {

            promiseResult.innerHTML += `
                <p>Subject: ${student.subject}</p>
                <p>Level: ${student.level}</p>
                <p class="success">Promise completed!</p>
            `;

        })

        .catch((error) => {

            promiseResult.innerHTML = `
                <p class="error">Error: ${error}</p>
            `;

        })

        .finally(() => {

            promiseBtn.disabled = false;

        });

});


// 2. ASYNC / AWAIT

async function showStudent() {

    asyncBtn.disabled = true;

    asyncResult.innerHTML = `
        <p class="loading">Loading student information...</p>
        <div class="loader"></div>
    `;

    try {

        const student = await getStudent();

        asyncResult.innerHTML = `
            <p class="success">Student loaded successfully!</p>
            <p>Name: ${student.name}</p>
            <p>Age: ${student.age}</p>
            <p>Subject: ${student.subject}</p>
            <p>Level: ${student.level}</p>
            <p class="success">Async/Await completed!</p>
        `;

    }

    catch (error) {

        asyncResult.innerHTML = `
            <p class="error">Error: ${error}</p>
        `;

    }

    finally {

        asyncBtn.disabled = false;

    }

}

asyncBtn.addEventListener("click", showStudent)
