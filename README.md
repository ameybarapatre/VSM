# VSM
Virtual Stock Market is an online event where trading is done online with virtual points over companies and forex .The winner is decided over the networth of the individuals at the end of the event .

Upuntil 2014 the stock prices of the companies were manually set and randomnly decided at the will of the organisers.
This led to wide disparity in the networth of the people participating in the event,
This algorithm implementation project aids decision making about the company stock prices and attempts leveling the networth of the players.

# sqltomongo.js :
  This file transfers the data from the MySQL server to local MongoDB , Since the site was hosted at shared hosting MySQL was the sole     choice.
  Three Collections are created from the MySQL Backend :
  1) User :  it stores the Current fluid amount present in the user's account and the user id. 
  2) Usercompany : it stores the userid and the noof shares of each company that the user holds.
  3) Company :  it stores the stock prices of the company and the company name.

# networth.js :
  This files calculates the networth of each user it uses Aysnc module , the queue from async module is used to get the sum total of the 
  valuation of stocks the user holds in various companies  and the fluid amount present with user, and adds it to the usercompany          document it belongs to.
  q1 - > queue for each user
  q - > queue for each company

# Regression.js :
  The algorithm generates  second degree polynomials for the networth and the distribution of stocks among the users against their      ranking according to networths using the regression module .Second degree polynomials are used since the regression of the networth   or stocks might not be always linear , second degree curves also ensure single minima or maxima which is useful in later part of the   algorithm.The polynomials are generated after the datasets have  been normalised to  a max value of 100 so as to ensure that each     polynomial intersects atleast once and end at the same points.
   
   Output of the file is the Maximum values of stocks of the company that have been bought buy a single individual and the regression   for the  networth against ranking 

# Dictate.js :
  To even the networth the among the users , the company whose stockprice must be varied must have a distribution of stocks vs ranking   (Gi(x), where i denotes the company) such that it is an mirror image of the networth(y) vs ranking(x) distribution (G(x)) along the   line x = 50 ideally.
  
  For each company integral of F(x)-Gi(x) over 0 to 100 is computed which returns a net negative value if the distribution 
  of company is dominant over the lower portion of F(x) which is exactly needed for leveling the networth , Positive value is returned   if the company is not dominant over the lower portion of F(X).
  
  This value is the measure  which aids in deciding  the company to choose to increase or decrease the disparity in the networths.
  All the companies and the values are displayed in the output of the file.
