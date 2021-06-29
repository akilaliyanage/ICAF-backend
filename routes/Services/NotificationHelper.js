const express = require('express');
const Notification = require('../../models/ApproveNotification');



    const saveNotification = async (type , ItemId , userId , status) =>{
        
            console.log('saveNotification calledn : ' , userId)
            const notification = new Notification();
            notification.type = type;
            notification.itemId = ItemId;
            notification.userId = userId;
            notification.Status = status;
            console.log('Notification : ' , notification)
            await notification.save()
            .then((data) => {
                console.log('Notification add' , data);
                return data;
            })
            .catch((err) => {
                return null;
            })
    }


    const deleteNotification = async (notificationId) =>{
        
            let ID = notificationId;
            await Notification.findByIdAndDelete(ID).then(() => {
                console.log('Notification Deleted');
                return true;
            }).catch((err) => {
                console.log(err);
            })
    }
    
  

module.exports = {
    saveNotification,
    deleteNotification
};
