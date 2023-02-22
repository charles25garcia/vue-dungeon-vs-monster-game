export default function sortByName (item) {
    return item?.sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1);
}