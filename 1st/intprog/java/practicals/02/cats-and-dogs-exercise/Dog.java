public class Dog
{
   
    private String name;
    private float weight;
    private String preferredFood;
    
    public Dog(String dogName, float dogWeight, String dogPreferredFood){
        name = dogName;
        weight = dogWeight;
        preferredFood = dogPreferredFood;
    }
    
    public Dog(String dogName){
        name = dogName;
        weight = 15;
        preferredFood = "Pedigree Chum";
    }
    
    public String getName(){
        return name;
    }
    
    public void setName(String dogName){
        name = dogName;
    }
    
    public float getWeight(){
        return weight;
    }
    
    public void setWeight(float dogWeight){
        weight = dogWeight;
    }
    
    public String getPreferredFood(){
        return preferredFood;
    }
    
    public void setPreferredFood(String dogPreferredFood){
        preferredFood = dogPreferredFood;
    }
    
    public void bark(){
        System.out.println("woof woof woof");
    }
    
    public void feeding(){
        float grams;
        
        if (preferredFood == "Pedigree Chum"){
            grams = 5 * (weight / 200);
        }else if (preferredFood == "Barkers Chicken"){
            grams = 8 * (weight / 200);
        }else{
            grams = 10 * (weight / 200);
        }
        
        System.out.println("The dog should eat " + grams + " grams of dog food a day");
        
    }
    
    
}
