export const dateToString = (date: Date): string => {
  console.log('date', date)
  return date.toISOString().split('T')[0]
}
