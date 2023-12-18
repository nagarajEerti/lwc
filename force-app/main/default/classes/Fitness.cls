public class Fitness {

    public static double calculateBMI(double weight,double height){
        Double bmi = weight/Math.pow(height,2);
         return bmi;
    }
    public static double calculatePeace(double distenceInKms,double timeInMinits){
        Double peace = distenceInKms/timeInMinits;
         return peace;
    }
}