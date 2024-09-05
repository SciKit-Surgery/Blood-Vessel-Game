confidence_interval <- function(n, mean, sd){
	# I'm not understanding the subtletes of 
	# calculating z -values, but 
	# using 1.96 gives the same result as on - line
	# caclculators
	# OK, I think it's to do with sample size: see 
	# https://www.statology.org/t-distribution-table/. 
	# 1.96 is the value for infinite degrees of freedom, 
	# which is not us. so let's use the qt function, 
	# which should return 2.064
	# margin <- 1.96*sd/sqrt(n)
	margin <- qt(0.975, df=n-1)*sd/sqrt(n)
	lower <- mean - margin
	upper <- mean + margin
	return(c(mean, margin, lower, upper, sd))
}

raw_data <- read.csv('results.csv')

print ('Level 1 time')
confidence_interval(25, mean(raw_data$X1.time), sd(raw_data$X1.time))
print ('Level 2 time')
confidence_interval(25, mean(raw_data$X2.time), sd(raw_data$X2.time))
print ('Level 3 time')
confidence_interval(25, mean(raw_data$X3.time), sd(raw_data$X3.time))
print ('Level 4 time')
confidence_interval(25, mean(raw_data$X4.time), sd(raw_data$X4.time))
print ('Level 5 time')
confidence_interval(25, mean(raw_data$X5.time), sd(raw_data$X5.time))
print ('Level 5 time w/o outliers')
confidence_interval(24, 12.529, 5.546)
print ('Level 6 time')
confidence_interval(25, mean(raw_data$X6.time), sd(raw_data$X6.time))
print ('Level 7 time')
confidence_interval(25, mean(raw_data$X7.time), sd(raw_data$X7.time))
print ('Level 7 time w/o outliers')
confidence_interval(23, 13.881, 5.597)

print ('Level 1 accuracy')
confidence_interval(25, mean(raw_data$X1.accuracy), sd(raw_data$X1.accuracy))
print ('Level 2 accuracy')
confidence_interval(25, mean(raw_data$X2.accuracy), sd(raw_data$X2.accuracy))
print ('Level 3 accuracy')
confidence_interval(25, mean(raw_data$X3.accuracy), sd(raw_data$X3.accuracy))
print ('Level 4 accuracy')
confidence_interval(25, mean(raw_data$X4.accuracy), sd(raw_data$X4.accuracy))
print ('Level 5 accuracy')
confidence_interval(25, mean(raw_data$X5.accuracy), sd(raw_data$X5.accuracy))
print ('Level 6 accuracy')
confidence_interval(25, mean(raw_data$X6.accuracy), sd(raw_data$X6.accuracy))
print ('Level 7 accuracy')
confidence_interval(25, mean(raw_data$X7.accuracy), sd(raw_data$X7.accuracy))
