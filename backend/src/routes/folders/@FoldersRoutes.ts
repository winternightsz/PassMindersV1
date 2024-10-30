import { CreateFolder } from './create-folder';
import { app } from '../../server'
import { FindAllFolders } from './find-all-folders';
import { DeleteFolder } from './delete-folder';
import { FindFolderById } from './find-folder';

export const FoldersRoutes = async () => {
    app.register(CreateFolder);
    app.register(FindAllFolders);
    app.register(FindFolderById)
    app.register(DeleteFolder);
}
