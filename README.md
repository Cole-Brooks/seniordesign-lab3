# Team CASH: Laboratory #2 ECE:4880 - Senior Design
Contributors: Cole Brooks, Hongyu Zeng, Ann Thomas, Steve Wasiswa

### Project Motivation
This project was motivated by a poor experience that our senior design class had with Doodle. We attempted to use Doodle polls to schedule meet ups for class events such as lab check offs, etc. This did not work well because there were issues with how Doodle initializes timezones. This web application seeks to make a polling application that also handles event scheduling in a clean and intuitive way.

The problem was that there didn't seem to be a difference between what a 'poll' and an 'event' were in doodle. As humans, we intuitively see ways to connect things. We can understand that maybe if we write a poll as 'Can you meet at this time?', users will be able to translate that poll into an event which they will attend. While this indeed CAN work, it's not the cleanest way to do things.

Our solution was to definitively separate events and polls into their own sections of the web application. Event can be created and viewed on a calendar, while polls can be created and then viewed as a list of polls on a separate page of the application. 

We define an 'event' as a scheduled meeting. Any situation where you want to do something at the same time as another person is a good candidate for an event object.

We define a 'poll' as a question that can be asked, with a list of acceptable answers. Although you *could* create a poll that schedules a meeting such as 'When do you want to meet?' with options '10', '11, '12', '1', it would be much better to create an event for this question.
### Design Documentation

### Design Process and Experimentation:

### Requirements
format = '| num | Desc |'

|Req # | Description | 

### Test Report
(Test syntax: "| Test Name | Requirement | Expected Result | Actual Result | Pass/Fail | Date | Corrective Action (write an issue for this) |" )
| Test Name | Process | Expected Result | Actual Result | Pass/Fail | Date | Issue Written |

#### Summary

### How to Use
### Appendix & References
