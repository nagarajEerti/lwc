@isTest
public class CalculaterTest {
 
    @isTest
    public static void sumTest(){
      Calculater clc = new Calculater();
         Integer s = clc.sum(12, 12);
           System.assertEquals(24,s,'test count matched');
         //System.assert(20,s,'test count matched');
          Integer s1 = clc.sub(12, 12);
        System.assertEquals(0,s1,'test count matched');
    }
}