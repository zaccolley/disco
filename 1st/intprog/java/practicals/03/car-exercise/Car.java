public class Car
{
   
    private String make;
    private String model;
    private int engineSize;
    private Registration reg;
    private boolean fourWheelDrive;
    
    public Car(String make, String model, int engineSize, Registration reg){
        this.make = make;
        this.model = model;
        this.engineSize = engineSize;
        this.reg = reg;
        fourWheelDrive = false;
    }
    
    public String getMake(){
        return make;
    }
    
    public void setMake(String make){
        this.make = make;
    }
    
    public String getModel(){
        return model;
    }
    
    public void setModel(String model){
        this.model = model;
    }
    
    public int getEngineSize(){
        return engineSize;
    }
    
    public void setEngineSize(int engineSize){
        this.engineSize = engineSize;
    }
    
    public String getReg(){
        return this.reg.getReg();
    }
    
    public void setReg(String reg){        
       this.reg.setReg(reg);        
    }
    
    public boolean getFourWheelDrive(){
        return fourWheelDrive;
    }
    
    public void setFourWheelDrive(boolean fourWheelDrive){
        this.fourWheelDrive = fourWheelDrive;
    }
    
    

}
