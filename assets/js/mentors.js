/* =================================
   SHIKSHASETU MENTORS MODULE
================================= */

class MentorService {

    static async fetchAllMentors() {
        try {
            const data = await ApiService.get("/mentor");
            return data.mentors;
        } catch (error) {
            console.error("Failed to fetch mentors");
        }
    }

    static async renderMentors(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = "Loading mentors...";

        try {
            const mentors = await this.fetchAllMentors();

            if (!mentors || mentors.length === 0) {
                container.innerHTML = "<p>No mentors available.</p>";
                return;
            }

            container.innerHTML = mentors.map(mentor => `
                <div class="card">
                    <h3>${mentor.name}</h3>
                    <p>${mentor.bio}</p>
                    <p><strong>Experience:</strong> ${mentor.experience} years</p>
                </div>
            `).join("");

        } catch (error) {
            container.innerHTML = "<p>Failed to load mentors.</p>";
        }
    }
}