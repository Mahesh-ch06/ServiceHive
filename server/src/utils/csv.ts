const escapeCsvValue = (value: unknown) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  const needsQuotes = /[",\n]/.test(str);
  const escaped = str.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
};

export const buildLeadCsv = (rows: Record<string, unknown>[]) => {
  const headers = ["name", "email", "status", "source", "createdAt", "updatedAt"];
  const lines = [headers.join(",")];

  rows.forEach((row) => {
    const values = headers.map((key) => escapeCsvValue(row[key]));
    lines.push(values.join(","));
  });

  return lines.join("\n");
};
