self.addEventListener("install", event=>{
    self.skipWaiting();
});

self.addEventListener("activate", event=>{
    event.waitUntil(self.clients.claim());
});

let quests=[];

self.addEventListener("message", event=>{
    if(event.data.quests){
        quests=event.data.quests;
        scheduleNotifications();
    }
});

function scheduleNotifications(){
    quests.forEach(q=>{
        let [hour,minute]=q.time.split(":");
        let now=new Date();
        let notif=new Date();
        notif.setHours(hour,minute,0,0);
        if(now>notif) notif.setDate(notif.getDate()+1);
        let timeout=notif-now;

        setTimeout(()=>{
            self.registration.showNotification("Quest Reminder",{
                body:q.name,
                icon:"icon-192.png"
            });
            scheduleNotifications();
        },timeout);
    });
}
