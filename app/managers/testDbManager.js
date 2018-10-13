"use strict";

const db = require('../../data/users.json'),
      fakeDelay=100,
      query = require("mysql-query-promise");

module.exports = {

    /**
     * Get all records from memory DB
     * @return {Promise}
     */
    getAll: function getAllFromDb() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(db || []);
            }, fakeDelay);
        });
    },

    getWebId: function getWebId(){
        var qs = 'insert into test3.webId set user_id=0';
        return query(qs,  'master')
    },

    getUserData: function getUserData(params){
        try{
            if(params.login){
                var qs = 'select * from test3.users where login=?';
                return query(qs, [params.login],  'master')
            }
            return
        }catch (e) {
            console.log(e)
            return
        }
    },

    userData: function getWebId(params){
        try{
            if(params.login){
                var qs = 'insert IGNORE test3.users set login=?, sex=?, age=?';
                return query(qs, [params.login,params.sex,params.age],  'master')
            }
            return
        }catch (e) {
            console.log(e)
            return
        }

    },

    /**
     * Get record by id from memory DB
     * @param id
     * @return {Promise}
     */
    getById: function getIdFromDb(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(db[parseInt(id)] || {});
            }, fakeDelay);
        });
    },

    /**
     * Add new record to memory DB
     * @param name
     * @return {Promise}
     */
    setNewId: function setNewIdToDb(name) {
        let length = db.length;
        db.push({id: length, name: name});
        return module.exports.getById(length);
    },

    /**
     * Update record into memory DB
     * @param id
     * @param name
     * @return {Promise}
     */
    updateId: function updateIdToDb(id,name) {
        db[parseInt(id)] = {id: parseInt(id), name: name};
        return module.exports.getById(id);
    },

    /**
     * Remove record from memory DB
     * @param id
     * @return {Promise}
     */
    removeId: function removeIdInDb(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (parseInt(id) === (db.length-1)) {
                    db.pop();
                } else {
                    delete db[parseInt(id)];
                }
                resolve();
            }, fakeDelay);
        });
    }
};
