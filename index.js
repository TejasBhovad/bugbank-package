// bugbank-client.js
class BugBank {
  constructor() {
    this.BUGBANK_SECRET = null;
    this.baseURL = "http://localhost:3000";
  }

  setKey(secret) {
    if (!secret || typeof secret !== "string" || secret.trim() === "") {
      throw new Error("Invalid API key provided");
    }
    this.BUGBANK_SECRET = secret;
  }

  async sendReport(title, description, reporteeEmail = null, images = null) {
    if (!this.BUGBANK_SECRET) {
      throw new Error("API key not set. Call setKey() first.");
    }

    // Validate required parameters
    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    const payload = {
      title,
      description,
      reporteeEmail,
      images,
    };

    try {
      console.log("Sending report to:", `${this.baseURL}/api/report`);
      console.log("Payload:", payload);

      const response = await fetch(`${this.baseURL}/api/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Key": this.BUGBANK_SECRET,
        },
        body: JSON.stringify(payload),
        mode: "cors", // Explicitly set CORS mode
        credentials: "omit", // Don't send credentials
      });

      // Check if response exists
      if (!response) {
        throw new Error("No response received from server");
      }

      // Log response status and headers
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers));

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Server responded with status: ${response.status}`
        );
      }

      // Parse response
      const data = await response.json();
      console.log("Response data:", data);

      if (!data.success) {
        throw new Error(data.error || "Unknown error occurred");
      }

      return data;
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(`Failed to send report: ${error.message}`);
    }
  }

  // Utility method to check if the API is accessible
  async checkConnection() {
    try {
      const response = await fetch(`${this.baseURL}/api/report`, {
        method: "OPTIONS",
        mode: "cors",
      });
      return response.status === 204;
    } catch (error) {
      console.error("Connection check failed:", error);
      return false;
    }
  }
}

// Create and export a singleton instance
const bugbankClient = new BugBank();
export default bugbankClient;
