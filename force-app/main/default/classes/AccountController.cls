public class AccountController {

    public static Account insertAccount(Account acc){
         
        insert acc;
        return acc;
    }
    public static List<Account> insertAccount(List<Account> acc){
          insert acc;
        return acc;
    }
    public static List<Account> getAllAccounts(){
         List<Account> acc = [SELECT Name,Phone FROM Account];
        return acc;
    }
    public static void printAllAccounts(){
         List<Account> acc = getAllAccounts();
        for(Account a:acc){
           System.debug('name:'+a.Name +' Phone:'+a.Phone);
        }
    }
    public static Integer getAllAccountsCount(){
         Integer acc = getAllAccounts().size();
        return acc;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        try {
            return [SELECT Id,Name,Type,Industry FROM Account LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountListWithFilter(String type){
        try {
            return [SELECT Id,Name,Type,Industry FROM Account WHERE Type =:type LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountListWithSearch(String serchkey){
        try {
            String key = '%'+serchkey+'%';
            return [SELECT Id,Name,Type,Industry FROM Account WHERE Name LIKE :key LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}