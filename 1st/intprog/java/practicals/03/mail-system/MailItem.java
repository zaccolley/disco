/**
 * A class to model a simple mail item. The item has sender and recipient
 * addresses and a message string.
 * 
 * @author David J. Barnes and Michael Kölling
 * @version 2011.07.31
 */
public class MailItem
{
    // The priority of the message.
    private boolean priority;
    // The sender of the item.
    private EmailAddress from;
    // The intended recipient.
    private EmailAddress to;
    // The subject of the message.
    private String subject;
    // The text of the message.
    private String message;

    /**
     * Create a mail item from sender to the given recipient,
     * containing the given message.
     * @param from The sender of this item.
     * @param to The intended recipient of this item.
     * @param message The text of the message to be sent.
     */
    public MailItem(boolean priority, EmailAddress from, EmailAddress to, String subject, String message)
    {
        this.priority = priority;
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
    
    /**
     * @return The sender of this message.
     */
    public boolean getPriority()
    {
        return priority;
    }

    /**
     * @return The sender of this message.
     */
    public String getFrom()
    {
        return from.getEmailAddress();
    }

    /**
     * @return The intended recipient of this message.
     */
    public String getTo()
    {
        return to.getEmailAddress();
    }
    
    /**
     * @return The subject of this message.
     */
    public String getSubject()
    {
        return subject;
    }    

    /**
     * @return The text of the message.
     */
    public String getMessage()
    {
        return message;
    }

    /**
     * Print this mail message to the text terminal.
     */
    public void print()
    {
        String priorityMessage = "Non-urgent";
        if (priority == true){
            priorityMessage = "Urgent";
        }
        System.out.println("Priority: " + priorityMessage);
        System.out.println("From: " + from.getEmailAddress());
        System.out.println("To: " + to.getEmailAddress());
        System.out.println("Subject: " + subject);
        System.out.println("Message: " + message);
    }
}
