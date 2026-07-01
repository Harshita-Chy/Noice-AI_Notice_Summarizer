function categorizeNotice(
  title,
  publishedBy
) {
  const text =
    `${title} ${publishedBy}`
      .toLowerCase();

  if (
    text.includes("placement") ||
    text.includes("internship")
  ) {
    return "Placement";
  }

  if (
    text.includes("exam") ||
    text.includes("examination")
  ) {
    return "Exam";
  }

  if (
    text.includes("hostel") ||
    text.includes("mess")
  ) {
    return "Hostel";
  }

  if (
    text.includes("academic")
  ) {
    return "Academic";
  }

  return "General";
}

module.exports =
  categorizeNotice;