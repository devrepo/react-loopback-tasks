import { createStore, combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import orm from '../models'

export default createReducer(orm);