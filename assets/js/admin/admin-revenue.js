document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
        window.location.href = "../auth/admin.html";
        return;
    }

    const apiBase = "http://127.0.0.1:8000/api/analytics";
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
    };

    try {
        const response = await fetch(`${apiBase}/revenue`, { headers });
        const result = await response.json();

        if (result.success) {
            const data = result.data;
            const totalRevenue = data.breakdown.labrador + data.breakdown.mastiff;

            // Update Cards
            document.getElementById('total-revenue').textContent = '₱' + totalRevenue.toLocaleString();
            document.getElementById('monthly-revenue').textContent = '₱' + totalRevenue.toLocaleString(); // Simplified for now

            // Active Premiums
            // We can infer this from the breakdown values / price
            const labCount = data.breakdown.labrador / 49;
            const mastCount = data.breakdown.mastiff / 99;
            document.getElementById('active-premiums').textContent = Math.round(labCount + mastCount);

            // Cancelled - We don't have this data yet, set to 0
            document.getElementById('cancelled-count').textContent = '0';

            // Table - We don't have transaction history in the API yet, so show empty
            const tableBody = document.getElementById('revenue-table-body');
            if (tableBody) {
                tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No transaction history available.</td></tr>`;
            }
        }
    } catch (error) {
        console.error("Error loading revenue data:", error);
    }
});
