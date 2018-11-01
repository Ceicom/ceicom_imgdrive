/** 
 * Class with functions to handle files 
 * @author Keller Kichel
 * */
module.exports = class HandleFile {

    /**
     * Initialize the allowedEXT array with the allowed extensions
     * @param {Object} req.query
     */
    constructor({ ext, addext }) {
        this.allowedEXT = ext ? ext.split(',') : ['jpg', 'bmp', 'png', 'gif', 'jpeg', 'svg', 'mp3'];
        this.addExtension(addext);
    }

    /**
     * Remove base folder from the passed folder path
     * @example
     *   // return "media/noticias/diversas/imagem.jpg"
     * handleFile.adjustPath('C:/Compartilhada/media/noticias/diversas/imagem.jpg', 'C:/Compartilhada');
     * 
     * @param {String} folder 
     * @param {String} base 
     * 
     * @returns {String} Clean path
     */
    adjustPath(folder, base) {
        return folder.replace(/\\/g, '/').replace(base, '').replace(/^\//g, '');
    }

    /**
     * Add extension to allowed extension list
     * @param {String} ext - Can be comma separated strings
     */
    addExtension(ext) {
        if (!ext) return;
        const extArr = ext.split(',');
        extArr.forEach(item => {
            if (!this.allowedEXT.includes(item))
                this.allowedEXT.push(item);
        });
    }

    /**
     * Remove extension from allowed extension list
     * @param {String} ext - Can be comma separated strings
     */
    removeExtension(ext) {
        if (!ext) return;
        const extArr = ext.split(',');
        extArr.forEach(item => {
            if (!this.allowedEXT.includes(item))
                this.allowedEXT.splice(this.allowedEXT.indexOf(item), 1);
        });
    }

    /**
     * Adjust path to return a JSON Object
     * @param {String} paths 
     * @param {String} base 
     * 
     * @returns {Object} JSON Object
     */
    dealPaths(paths, base) {
        let info = {};

        paths.map(path => {
            const data = this.adjustPath(path, base).split('/');
            let folder = info;

            while (data.length) {
                const fold = data.shift();

                if (!folder.hasOwnProperty(fold))
                    folder[fold] = {};

                folder = folder[fold];
            }
        });

        return info;
    }

    /**
     * Get only the files with allowed extension
     * @param {Array} files 
     * 
     * @returns {Array} Allowed files
     */
    dealFiles(files) {
        return files.filter(file => {
            const info = file.split('.');
            return this.allowedEXT.includes(info[info.length - 1]);
        });
    }
}