class WeaponPart {
    /**
     * 
     * @param {string} name 
     * @param {number[]} patterns if the list is empty, it means that all patterns are available
     */
    constructor(name, patterns) {
        this.name = name;
        this.patterns = patterns;
    }

    isPatternAvailable = (pattern) => {
        const nbPattern = +pattern;
        return this.patterns.length === 0
            || this.patterns.includes(nbPattern);
    }

    generateBaseForSvg = (folder) => {
        return '<image width="100%" height="100%"'
            + 'xlink:href="imgs/skins/' + folder + '/' + this.name + '_base.png" />';
    };

    generatePatternWithFilterForSvg = (
        folder,
        pattern, filter_name
    ) => {
        return '<image width="100%" height="100%"'
            + 'xlink:href="imgs/skins/' + folder + '/' + this.name + '_' + pattern + '.png"'
            + 'filter="url(#' + filter_name + ')" />';
    };
}

class WeaponPattern {
    /**
     * 
     * @param {string} name name of the pattern
     * @param {number} index index of the pattern
     * @param {string} color hex color
     */
    constructor(name, index, color) {
        this.name = name;
        this.index = index;
        this.color = color;
    }
}

class Weapon {
    /**
     * 
     * @param {string} folder 
     * @param {WeaponPart[]} parts 
     */
    constructor(folder, parts) {
        this.folder = folder;
        this.parts = parts;
    }

    _generateFilterForSvg = (name, color) => {
        const filter_name = this.folder + '_mask_' + name;
        return {
            "filter_name": filter_name,
            "filter_svg":
                '<filter id="' + filter_name + '">'
                + '<feFlood flood-color="' + color + '" result="flood" />'
                + '<feComposite in="SourceGraphic" in2="flood" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />'
                + '</filter>'
        };
    };

    /**
     * @param {WeaponPattern[]} weaponPatterns
     */
    _generateDefsForSvg = (weaponPatterns) => {
        const defsAndFilters = {
            "defs": "",
            "filters": []
        };
        defsAndFilters.defs += '<defs id="' + this.folder + '_filters_defs">\n';
        weaponPatterns.forEach((pattern) => {
            if (pattern.index > 0) {
                const filter = this._generateFilterForSvg(pattern.name, pattern.color);
                defsAndFilters.defs += filter.filter_svg + '\n';
                defsAndFilters.filters.push(filter.filter_name);
            }
        });
        defsAndFilters.defs += '</defs>\n';
        return defsAndFilters;
    }

    /**
     * @param {string[]} filters
     * @param {WeaponPattern[]} weaponPatterns
     */
    _generateGroupeForSvg = (filters, weaponPatterns) => {
        let group = '<g id="' + this.folder + '_parts_and_patterns_group">';
        this.parts.forEach((part) => {
            let imgPart = part.generateBaseForSvg(this.folder);
            let filterIndex = 0;
            weaponPatterns.forEach((pattern) => {
                if (pattern.index > 0) {
                    if (part.isPatternAvailable(pattern.index)) {
                        imgPart += part.generatePatternWithFilterForSvg(this.folder, pattern.index, filters[filterIndex]);
                    }
                    filterIndex++;
                }
            });
            group += imgPart;
        });
        group += '</g>\n';
        return group;
    }

    /**
     * 
     * @param {number} width width of the svg
     * @param {number} height height of the svg
     * @param {WeaponPattern[]} weaponPatterns patterns applied to the weapon svg
     */
    generateSvgGivenPatterns = (
        width, height,
        weaponPatterns
    ) => {
        let svgHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" '
            + 'width="' + width + '" height="' + height + '">';
        const defsAndFilters = this._generateDefsForSvg(weaponPatterns);
        const group = this._generateGroupeForSvg(defsAndFilters.filters, weaponPatterns);
        svgHTML += defsAndFilters.defs;
        svgHTML += group;
        svgHTML += '</svg>';
        return svgHTML;
    }
};