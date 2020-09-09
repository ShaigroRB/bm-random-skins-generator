const weapons = [
    new Weapon("burst_rifle", [
        new WeaponPart("burst_rifle", []),
        new WeaponPart("burst_rifle_reload", [11, 12])
    ]),
    new Weapon("acid_gun", [
        new WeaponPart("acid_gun", [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]),
        new WeaponPart("acid_gun_handle", [1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14])
    ]),
    new Weapon("handcannon", [
        new WeaponPart("handcannon", [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]),
        new WeaponPart("handcannon_top", [1, 2, 3, 4, 7, 8, 9, 11, 12, 13, 14])
    ]),
    new Weapon("pistol", [
        new WeaponPart("pistol", [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]),
        new WeaponPart("pistol_top", [1, 3, 7, 8, 9, 11, 12, 13, 14])
    ]),
    new Weapon("compact_pistol", [
        new WeaponPart("compact_pistol", [1, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]),
        new WeaponPart("compact_pistol_top", [1, 3, 5, 7, 8, 9, 11, 12, 13, 14])
    ]),
    new Weapon("burst_pistol", [
        new WeaponPart("burst_pistol", [1, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]),
        new WeaponPart("burst_pistol_end", [1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 14]),
        new WeaponPart("burst_pistol_reload", [11, 12])
    ]),
    new Weapon("healgun", [
        new WeaponPart("healgun", []),
        new WeaponPart("healgun_cross", [-1])
    ]),
    new Weapon("double_barrel", [
        new WeaponPart("double_barrel", [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
        new WeaponPart("double_barrel_handle", [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14])
    ]),
    new Weapon("grenade_launcher", [
        new WeaponPart("grenade_launcher", [1, 2, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]),
        new WeaponPart("grenade_launcher_handle", [1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 14])
    ]),
    new Weapon("boomerang", [
        new WeaponPart("boomerang", [])
    ]),
    new Weapon("bow", [
        new WeaponPart("bow", [])
    ]),
    new Weapon("crossbow", [
        new WeaponPart("crossbow", [])
    ]),
    new Weapon("fire_uzi", [
        new WeaponPart("fire_uzi", [])
    ]),
];

const skinViewer = document.getElementById("skin-viewer");

/**
 * 
 * @param {number} base index of the base
 * @param {string} base_color hex color
 * @param {number} pattern1 index of the first pattern
 * @param {string} pattern1_color hex color
 * @param {number} pattern2 index of the second pattern
 * @param {string} pattern2_color hex color
 */
const generateSvgForSkin = (
    base, base_color,
    pattern1, pattern1_color,
    pattern2, pattern2_color
) => {
    const weaponPatterns = [
        new WeaponPattern("base", base, base_color),
        new WeaponPattern("pattern1", pattern1, pattern1_color),
        new WeaponPattern("pattern2", pattern2, pattern2_color)
    ];

    const weapon = weapons[randomGivenMinAndMax(0, weapons.length)];
    skinViewer.innerHTML = weapon.generateSvgGivenPatterns(250, 144, weaponPatterns);
};