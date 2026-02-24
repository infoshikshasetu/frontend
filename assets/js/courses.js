/* =================================
   SHIKSHASETU COURSES MODULE
================================= */

class CourseService {

    static async fetchAllCourses() {
        try {
            const data = await ApiService.get("/course");
            return data.courses;
        } catch (error) {
            console.error("Failed to fetch courses");
        }
    }

    static async renderCourses(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = "Loading courses...";

        try {
            const courses = await this.fetchAllCourses();

            if (!courses || courses.length === 0) {
                container.innerHTML = "<p>No courses available.</p>";
                return;
            }

            container.innerHTML = courses.map(course => `
                <div class="card">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p><strong>Price:</strong> ₹${course.price}</p>
                    <a href="#" class="btn btn-primary">Enroll</a>
                </div>
            `).join("");

        } catch (error) {
            container.innerHTML = "<p>Failed to load courses.</p>";
        }
    }
}