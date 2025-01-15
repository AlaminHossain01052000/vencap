function getRemainingDays(project) {
    // Ensure the project object and returnDate exist
    if (!project || !project?.returnDate) {
        throw new Error("Project object or returnDate is missing!");
    }

    // Parse the returnDate as a Date object
    const returnDate = new Date(project?.returnDate);

    // Validate if the returnDate is a valid date
    if (isNaN(returnDate)) {
        throw new Error("Invalid returnDate format!");
    }

    // Get today's date without the time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate the difference in time (milliseconds)
    const timeDifference = returnDate - today;

    // Convert the time difference to days
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // Return the remaining days
    return remainingDays >= 0 ? remainingDays : 0; // Return 0 if the date has passed
}
export default getRemainingDays;