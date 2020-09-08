class WeaponPart {
    /**
     * 
     * @param {string} name 
     * @param {number[]} patterns 
     */
    constructor(name, patterns) {
        this.name = name;
        this.patterns = patterns;
    }

    isPatternAvailable = (pattern) => {
        return this.patterns.includes(pattern);
    }
}

class Weapon {
    /**
     * 
     * @param {string} basename 
     * @param {WeaponPart[]} parts 
     */
    constructor(basename, parts) {
        this.basename = basename;
        this.parts = parts;
    }

    generateBaseAsSvg = () => {
        let resultBase = generateWeaponPartBaseForSvg(this.basename, this.basename);
        this.parts.forEach((part) => {
            resultBase += generateWeaponPartBaseForSvg(this.basename, part.name);
        });
        return resultBase;
    }

    generatePatternAsSvgWithFilter = (pattern, filter_name) => {
        let resultPattern = generateWeaponPartPatternWithFilterForSvg(this.basename, this.basename, pattern, filter_name);
        this.parts.forEach((part) => {
            if (part.isPatternAvailable(pattern)) {
                resultPattern += generateWeaponPartPatternWithFilterForSvg(this.basename, part.name, pattern, filter_name);
            }
        });
        return resultPattern;
    }
};