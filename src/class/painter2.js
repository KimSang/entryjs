import EntryPaint from 'entry-paint';

Entry.Painter = class Painter {
    constructor(view) {
        this.view = view;
        this.baseUrl = Entry.painterBaseUrl;

        this.file = {
            id: Entry.generateHash(),
            name: '새그림',
            modified: false,
            mode: 'new', // new or edit
        };

        this.clipboard = null;
        this.initialize();
    }

    initialize() {
        EntryPaint.init({ parent: this.view });

        Entry.addEventListener('pictureSelected', this.changePicture.bind(this));
    }

    show() {}

    hide() {}

    changePicture(picture = {}) {
        if (this.file && this.file.id === picture.id) {
            if (!this.file.isUpdate) {
                Entry.stage.updateObject();
                this.file.isUpdate = true;
            }
            return;
        } else if (!this.file.modified) {
            this.afterModified(picture);
        } else {
            if (this.isConfirm) {
                return;
            }

            this.isConfirm = true;
            let wasRun = false;
            if (Entry.engine.state === 'run') {
                Entry.engine.toggleStop();
                wasRun = true;
            }
            entrylms.confirm(Lang.Menus.save_modified_shape).then((result) => {
                this.isConfirm = false;
                if (result === true) {
                    this.fileSave(true);
                } else {
                    this.file.modified = false;
                }

                if (!wasRun) {
                    this.afterModified(picture);
                } else {
                    Entry.playground.injectPicture();
                }
            });
        }
        Entry.stage.updateObject();
        this.file.isUpdate = true;
    }

    addPicture(picture, isOriginal) {
        const image = new Image();

        if (picture.fileurl) {
            image.src = picture.fileurl;
        } else {
            // deprecated
            image.src = `${Entry.defaultPath}/uploads/${picture.filename.substring(
                0,
                2
            )}/${picture.filename.substring(2, 4)}/image/${picture.filename}.png`;
        }

        EntryPaint.BitmapImporter.import(image.src);
    }

    afterModified(picture) {
        const file = this.file;
        file.modified = false;

        if (picture.id) {
            file.id = picture.id || Entry.generateHash();
            file.name = picture.name;
            file.mode = 'edit';
            file.objectId = picture.objectId;

            this.addPicture(picture, true);
        } else {
            file.id = Entry.generateHash();
        }

        // this.lc.undoStack = [];
        Entry.stateManager.removeAllPictureCommand();
    }

    fileSave(taskParam) {
        if (!Entry.stage.selectedObject) {
            return;
        }
        // const dataURL = this.lc.getImage().toDataURL();
        // this.file_ = JSON.parse(JSON.stringify(this.file));
        // Entry.dispatchEvent('saveCanvasImage', {
        //     file: this.file_,
        //     image: dataURL,
        //     task: taskParam,
        // });

        this.file.isUpdate = false;
        this.file.modified = false;
    }
};