import axios from "axios";
import { useCookies } from "react-cookie";

const base_url = "http://localhost:5000/api/v1"


class AppService {

   signup(payload) {
        return axios.post(base_url + '/user/signup', payload)
   }

   signin(payload) {
        return axios.post(base_url + '/auth/signin', payload)
   }

   showBalance() {
     const token = localStorage.getItem('access_token')
       return axios.get(base_url + '/user/wallet/balance',{
          headers: {
               "Authorization": token
          }
       })
   }

   createWallet() {
     const token = localStorage.getItem('access_token')
       return axios.post(base_url + '/user/wallet', {}, {
          headers: {
               "Authorization": token
          }
       })
   }


   addAmount(payload) {
     const token = localStorage.getItem('access_token')
       return axios.post(base_url + '/user/wallet/amount',payload,{
          headers: {
               "Authorization": token
          }
       })
   }

   checkAuthStatus() {
     const token = localStorage.getItem('access_token')
       return axios.get(base_url + '/auth/checkAuthStatus',{
          headers: {
               "Authorization": token
          }
       })
   }

   saveGame(payload) {
     const token = localStorage.getItem('access_token')
       return axios.post(base_url + '/user/game/save',payload,{
          headers: {
               "Authorization": token
          }
       })

   }

   scoreBoard() {
     const token = localStorage.getItem('access_token')
       return axios.get(base_url + '/user/game/scoreboard',{
          headers: {
               "Authorization": token
          }
       })

   }

   getUsers() {
     const token = localStorage.getItem('access_token')
       return axios.get(base_url + '/admin/users',{
          headers: {
               "Authorization": token
          }
       })

   }

   getManage() {
     const token = localStorage.getItem('access_token')
       return axios.get(base_url + '/admin/manage',{
          headers: {
               "Authorization": token
          }
       })

   }

   updateManage(payload) {
     const token = localStorage.getItem('access_token')
       return axios.post(base_url + '/admin/manage', payload, {
          headers: {
               "Authorization": token
          }
       })

   }

   deleteUser(payload) {
     const token = localStorage.getItem('access_token')
       return axios.delete(base_url + '/admin/user/'+payload.userId, {
          headers: {
               "Authorization": token
          }
       })

   }

   walletAvailable() {
     const token = localStorage.getItem('access_token')
       return axios.get(base_url + '/user/wallet/available', {
          headers: {
               "Authorization": token
          }
       })

   }

   addGameTypes(payload) {
     const token = localStorage.getItem('access_token')
       return axios.post(base_url + '/admin/gameTypes',payload, {
          headers: {
               "Authorization": token
          }
       })

   }

   listGameTypes() {
     const token = localStorage.getItem('access_token')
       return axios.get(base_url + '/admin/gameTypes', {
          headers: {
               "Authorization": token
          }
       })
   }

   deleteGameType(payload) {
     const token = localStorage.getItem('access_token')
       return axios.delete(base_url + '/admin/gameTypes/'+ payload.gameTypeId , {
          headers: {
               "Authorization": token
          }
       })
   }


}


export default new AppService()