const express = require('express');
const Notification = require('../../models/ApproveNotification');



    const saveNotification = async (type , ItemId , userId , status) =>{
        
            const notification = new Notification();
            notification.type = type;
            notification.itemId = ItemId;
            notification.userId = userId;
            notification.Status = status;
            notification.save()
            .then((data) => {
                res.status(200).send({data: data})
            })
            .catch((err) => {
                res.status(500).send({error: err.message})
            })
    }


    const deleteNotification = async (notificationId) =>{
        
            let ID = notificationId;
            await Notification.findByIdAndDelete(ID).then(() => {
                res.json({status:200});
            }).catch((err) => {
                console.log(err);
            })
    }
    
  

module.exports = {
    saveNotification,
    deleteNotification
};
