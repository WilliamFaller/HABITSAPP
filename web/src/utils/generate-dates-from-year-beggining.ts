import dayjs from 'dayjs'

/* Função para gerar datas desde o começo do ano! */
export function generateDatesFromYearBeginning() {
  //Pegar a data do primeiro dia do ano com dayjs
  const firstDayOfTheYear = dayjs().startOf('year')
  const today = new Date()

  const dates = []
  let compareDate = firstDayOfTheYear

  /*
  Enquanto a data não chegar no dia de hoje, adicione essa data no array 'dates' e adicione mais um dia para ser verificado!
  */
 
  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dates
}