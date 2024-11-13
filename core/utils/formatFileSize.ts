export const formatFileSize = (size: number) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const sizeInUnit = (size / Math.pow(1024, i)).toFixed(1);
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    return `${sizeInUnit} ${units[i]}`;
}
