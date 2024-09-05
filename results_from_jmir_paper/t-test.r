
ttest <- function(data_0, data_1){
	# based on 
	# https://www.statskingdom.com/150MeanT2uneq.html

	results <- t.test(data_0, data_1, alternative = "two.sided", paired = FALSE, var.equal = FALSE, conf.level = 0.95)
	return(results)
}

raw_data <- read.csv('results.csv')
print ("Comparing 1 and 2")
ttest(raw_data$X1.time, raw_data$X2.time)
print ("Comparing 2 and 3")
ttest(raw_data$X2.time, raw_data$X3.time)
print ("Comparing 3 and 4")
ttest(raw_data$X3.time, raw_data$X4.time)
print ("Comparing 4 and 5")
ttest(raw_data$X4.time, raw_data$X5.time)
print ("Comparing 5 and 6")
ttest(raw_data$X5.time, raw_data$X6.time)
print ("Comparing 6 and 7")
ttest(raw_data$X6.time, raw_data$X7.time)
