public class EmailAddress
{
   private String email;
   
   public EmailAddress(String user, String address){
        email = user + "@" + address;
   }
   
   public void setEmailAddress(String user, String address){
        email = user + "@" + address;
   }
   
   public String getEmailAddress(){
        return email;
   }
}
