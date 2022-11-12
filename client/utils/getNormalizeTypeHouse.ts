export const getNormalizeTypeHouse = (type: string): string => {
  switch (type) {
    case 'flat': return 'Квартира'
    case 'house': return 'Дом'
    case 'room': return 'Комната'
    default: return ''
  }

}
