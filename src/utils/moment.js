import moment from "moment"

export const cleanedDateStr = (date = null) => {
    return moment(date ? date : new Date()).format('MMMM D');
}
  