import {ERA, ERA_ALT}
    from "Date/Constant/Constant";

export const ERA_KEYS = [
    ERA,
    ERA_ALT
];

export const ERA_LOOKUP = [
    { [ERA]: "BC", [ERA_ALT]: "BCE" },
    { [ERA]: "B.C.", [ERA_ALT]: "B.C.E." },
    { [ERA]: "AD", [ERA_ALT]: "CE" },
    { [ERA]: "A.D.", [ERA_ALT]: "C.E." },
];
