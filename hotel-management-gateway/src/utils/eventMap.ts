// const eventMap: Record<string, string[]> = {
//   "נופש מלא": ["יום א", "יום ב"],
//   "יום א": ["יום א"],
//   "יום ב": ["יום ב"]
// };

// export default eventMap;


// ⚠️ שים לב: משתמשים בקו תחתון (_) כי ככה הנתונים נכנסים מה-client
const eventMap: Record<string, string[]> = {
    "נופש_מלא": ["יום_א", "יום_ב"],
    "יום_א": ["יום_א"],
    "יום_ב": ["יום_ב"],
    "שבת": ["יום_ו", "שבת"],
};

export default eventMap;