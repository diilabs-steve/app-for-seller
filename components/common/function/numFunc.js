export const formatConvert = (num) => {
    return num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0
}