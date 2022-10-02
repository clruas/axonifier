import { atom } from 'recoil'

export const QuestionState = atom({
    key: 'QuestionState',
    default: []
})


export const SearchQuestionState = atom({
    key: 'SearchQuestionState',
    default: ''
})