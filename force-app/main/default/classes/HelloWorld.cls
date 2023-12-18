public class HelloWorld {
   public String getDay(String day){
  switch on day{
            when 'sun' {
               return 'sunday';
            }
            when 'mon' {
               return 'monday';
            }
            when 'tus' {
               return 'tusday';
            }
            when 'wed' {
               return 'wednesday';
            }
            when 'thu' {
               return 'thursday';
            }
            when 'fri' {
               return 'friday';
            }
            when 'sat' {
               return 'saturday';
            }
            when else{
             return 'given num is out days';
            }
        }
   }
   
   public String getDay(Integer day){
        switch on day{
            when 0 {
               return 'sunday';
            }
            when 1 {
               return 'monday';
            }
            when 2 {
               return 'thusday';
            }
            when 3 {
               return 'wednesday';
            }
            when 4 {
               return 'thursday';
            }
            when 5 {
               return 'friday';
            }
            when 6 {
               return 'saturday';
            }
            when else{
             return 'given num is out days';
            }
        }//switch
   }//getday
}//class