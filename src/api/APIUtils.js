/* eslint-disable prefer-template */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { getToken, onLogout } from 'features/authentication/authentication';
import { store } from 'stores';

const ROOT_API_URL = process.env.REACT_APP_ROOT_API_URL;

class APIUtils {
	static POSTnoAuth(endpoint, data) {
		return fetch(ROOT_API_URL + endpoint, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(data)
		}).then(response => {
			// console.log(response);
			if (response.ok) {
				return response.json()
			}
			return Promise.reject({
				message: response.statusText,
			});
		}).then(data => {
			if (data.success) {
				return data
			}
			return Promise.reject({
				message: data.err,
				data: data.data,
			});
		});
	}

	static POST(endpoint, data) {
		return fetch(ROOT_API_URL + endpoint, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'Authorization': 'Bearer ' + APIUtils.getToken(),
		  },
		  body: JSON.stringify(data)
		}).then(response => {
			if (response.ok) {
				return response.json()
			}
			return Promise.reject({
				message: response.statusText,
			});
		}).then(data => {
			if (data.success) {
				return data
			}
			return Promise.reject({
				message: data.err,
				data: data.data,
			});
		});
	}

	static POSTFile(endpoint, data) {
		return fetch(ROOT_API_URL + endpoint, {
			method: 'POST',
		  headers: {
				// 'Accept': '*/*',
		    'Authorization': 'Bearer ' + APIUtils.getToken(),
		  },
		  body: data
		}).then(response => {
			if (response.ok) {
				return response.json()
			}
			return Promise.reject({
				message: response.statusText,
			});
		}).then(data => {
			if (data.success) {
				return data
			}
			return Promise.reject({
				message: data.err,
				data: data.data,
			});
		});
	}

	static GET(endpoint) {
		return fetch(ROOT_API_URL + endpoint, {
		  method: 'GET',
		  headers: {
		    'Authorization': 'Bearer ' + APIUtils.getToken(),
		  },
		}).then(response => {
			if (response.ok) {
				return response.json()
			}
			return Promise.reject({
				message: response.statusText,
			});
		}).then(data => {
			if (data.success) {
				return data
			}
			return Promise.reject({
				message: data.err,
				data: data.data,
			});
		});
	}

	static POSTDownload(endpoint) {
		return fetch(ROOT_API_URL + endpoint, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Authorization': 'Bearer ' + APIUtils.getToken(),
				accept: 'application/json',
			},
		}).then(response => response.blob())
		.then(blob => URL.createObjectURL(blob))
		.then(url => {
			window.open(url, '_blank');
			URL.revokeObjectURL(url)
		})
	}

	static logOut(reason) {
		this.deleteToken()
		this.deleteUserInformation()
		if (reason) {
			this.saveLogOutReason(reason)
		}
	}

	static saveToken(token) {
		store.dispatch(getToken(token))
	}

	static saveUserInfomation(user) {
		localStorage.setItem('user', user)
	}

	static deleteUserInformation() {
		return localStorage.removeItem('user')
	}

	static getToken() {
		return store.getState().authentication.token;
	}

	static deleteToken() {
		store.dispatch(onLogout())
	}

	static saveLogOutReason(reason) {
		localStorage.setItem('logOutReason', reason)
	}

	static getLogOutReason() {
		return localStorage.getItem('logOutReason')
	}

	static deleteLogOutReason() {
		return localStorage.removeItem('logOutReason')
	}

	static isAuthed() {
		return APIUtils.getToken()
	}
}
export default APIUtils;
