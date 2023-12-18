public class OpprtunityController {
    public static void updateProfile(List<id> oppIds){
        List<Opportunity> opps = [SELECT Amount,Name,Profile__c FROM Opportunity WHERE Id In: oppIds];
        for(Opportunity opp:opps){
            
            if(opp.Amount == null){
              opp.Profile__c = '';
            }
            else if(opp.Amount < 10000){
                   opp.Profile__c= 'Low';
            }
            else if(opp.Amount > 500000){
                opp.Profile__c= 'High';
          }
            else{
                 opp.Profile__c= 'Meidum';
           }
            update opp;
        }
    }
}