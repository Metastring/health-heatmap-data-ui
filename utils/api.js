const API_ROOT = process.env.HHM_API_ROOT || 'http://localhost:8080/api'

const DATAFILES = `${API_ROOT}/datafile`
const ONEDATAFILE = (name) => `${DATAFILES}/details?name=${name}`

export const getDatafiles = () => fetch(DATAFILES)
export const getDatafile = (name) => fetch(ONEDATAFILE(name))