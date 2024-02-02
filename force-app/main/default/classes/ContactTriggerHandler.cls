public  class ContactTriggerHandler {
    public ContactTriggerHandler() {
    }
    public static void afterInsertHandler(List<Contact> newContacts){
        Set<Id> accIds = new Set<Id>();
      for(Contact con : newContacts){
        accIds.add(con.AccountId);
      }
       List<AggregateResult> results= [SELECT AccountId, COUNT(Id)totalContacts 
                                        FROM Contact 
                                        WHERE AccountId IN:accIds AND Active__C = true 
                                        GROUP BY AccountId];
     List<Account> accountsToUpdate = new List<Account>();
           for(AggregateResult result:results){
            String accId = String.valueOf(result.get('AccountId'));
            Integer totalContacts = Integer.valueOf(result.get('totalContacts'));
            Account acc = new Account(Id=accId,Active_Contact__c=totalContacts);
            accountsToUpdate.add(acc);
           }
           update accountsToUpdate;
    }
    public static void afterUpdateHandler(List<Contact> newContacts,Map<Id, Contact> oldMapContacts){
        Set<Id> accIds = new Set<Id>();
        for(Contact con : newContacts){
          if(String.isNotBlank(con.AccountId) && oldMapContacts.get(con.Id).Active__C != con.Active__C){
                accIds.add(con.AccountId);
          }
          else if( oldMapContacts.get(con.Id).AccountId != con.AccountId){
            accIds.add(con.AccountId);
            accIds.add(oldMapContacts.get(con.Id).AccountId);
          }
        }
         List<AggregateResult> results= [SELECT AccountId, COUNT(Id)totalContacts 
                                          FROM Contact 
                                          WHERE AccountId IN:accIds AND Active__C = true 
                                          GROUP BY AccountId];
       List<Account> accountsToUpdate = new List<Account>();
             for(AggregateResult result:results){
              String accId = String.valueOf(result.get('AccountId'));
              Integer totalContacts = Integer.valueOf(result.get('totalContacts'));
              Account acc = new Account(Id=accId,Active_Contact__c=totalContacts);
              accountsToUpdate.add(acc);
             }
             update accountsToUpdate;
    }
    public static void afterDeleteHandler(List<Contact> newContacts){
      Set<Id> accIds = new Set<Id>();
           for( Contact con:newContacts){
                 if(String.isNotBlank(con.AccountId)){
                  accIds.add(con.AccountId);
                 }
           }
        AccountContactServices.updateActiveContacts(accIds);
    }
    public static void afterUndeleteHandler(List<Contact> newContacts){
      Set<Id> accIds = new Set<Id>();
          for(Contact con:newContacts){
                 if(String.isNotBlank(con.AccountId)){
                  accIds.add(con.AccountId);
                 }
          }
        AccountContactServices.updateActiveContacts(accIds);
    }
    public static void sendEmailToSystemAdmin(List<Contact> cons){
      try {
        System.debug('Send email to the admin');
          List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
          User sysAdmin = [SELECT Id,Profile.Name,Email FROM USER WHERE Profile.Name ='System Administrator'];
          System.debug(sysAdmin);
        for(Contact c : cons){
          if(sysAdmin.Email != null){
            Messaging.SingleEmailMessage  email= new Messaging.SingleEmailMessage();
          email.setSubject('Sending FROM SYS ADMIN');
          email.setHtmlBody('<b> HI HERE IS MY EMAIL BODY AFTER CREATING CONTACT</b>');
          email.toaddresses = new String[] {sysAdmin.Email};
          mails.add(email);
          }
        }
         Messaging.SendEmailResult[] result = Messaging.sendEmail(mails);
         System.debug(result);
        
      } catch (Exception e) {
        System.debug(e.getCause());
      }
    }
    
}