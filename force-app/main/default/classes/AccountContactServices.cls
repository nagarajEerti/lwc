public class AccountContactServices {
    public AccountContactServices() {}

    public static void updateActiveContacts(Set<Id> accIds ){
        List<AggregateResult> results= [SELECT AccountId, COUNT(Id)totalContacts 
                                          FROM Contact 
                                          WHERE AccountId IN:accIds AND Active__C = true 
                                          GROUP BY AccountId];
       Map<Id,Account> accountsToUpdate = new Map<Id,Account>();
             for(AggregateResult result:results){
              String accId = String.valueOf(result.get('AccountId'));
              Integer totalContacts = Integer.valueOf(result.get('totalContacts'));
              Account acc = new Account(Id=accId,Active_Contact__c = totalContacts);
              accountsToUpdate.put(accId, acc);
             }

             //update the account with zero actives
             for(Id acId:accIds){
              if( !accountsToUpdate.containsKey(acId)){
                accountsToUpdate.put(acId, new Account(Id=acId,Active_Contact__c = 0) );
              }
             }

             update accountsToUpdate.values();
    }
    //v1
    // public static void updateActiveContacts(Set<Id> accIds ){
    //     List<AggregateResult> results= [SELECT AccountId, COUNT(Id)totalContacts 
    //                                       FROM Contact 
    //                                       WHERE AccountId IN:accIds AND Active__C = true 
    //                                       GROUP BY AccountId];
    //    List<Account> accountsToUpdate = new List<Account>();
    //          for(AggregateResult result:results){
    //           String accId = String.valueOf(result.get('AccountId'));
    //           Integer totalContacts = Integer.valueOf(result.get('totalContacts'));
    //           Account acc = new Account(Id=accId,Active_Contact__c = totalContacts);
    //           accountsToUpdate.add(acc);
    //          }
    //          update accountsToUpdate;
    // }
}