import json
import pickle
import numpy
import json
from django.http import Http404, HttpResponse

def more_todo(request):
    if request.is_ajax():
        todo_items = ['Mow Lawn', 'Buy Groceries',]
        data = json.dumps(todo_items)
        return HttpResponse(data, content_type='application/json')
    else:
        raise Http404

def add_todo(request):
    if request.is_ajax() and request.POST:
        data = {'message': "%s added" % request.POST.get('item')}
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        raise Http404

class getValues(jsonList):
    
    def parse_POST(self):
    
        weapons_or, stealing_or, fighting_or, drug_use_or, making_threats_or, verbal_bullying_or, vandalism_or, cyber_bullying_or, gang_activities_or, intimidation_or, ostracizing_or, sexual_harassment_or = numpy.loadtxt("./fake_data.csv", delimiter=",", skiprows=2, usecols=(1,2,3,4,5,6,7,8,9,10,11,12), unpack=True)
        
        trait_list = ["Abandoning commitments","Abandonment of friends and social groups","Abandonment or loss of interest in favorite pastimes","Academic problems","Aggressive behavior","An awkward phase","Anger and irritability","Appears fearful, anxious or paranoid","Attitude. Teenager and bad attitude","Avoidance of food and noticeable changes in eating habits should trigger concern.","Body image issues","Changes in eating habits","Changes in eating patterns that result in dramatic weight gain or loss","Changes in personality (becomes more aggressive, angry, withdrawn, etc.)","Changes in sleep patterns","Curfew violations","Defiance","Difficulty concentrating","Dramatic changes in eating habits","Eating habits that result in noticeable weight loss or gain","Excessive isolation","Excessive moodiness and tears","Excessive sensitivity to criticism","Excessive sleeping beyond your child's normal fatigue or insomnia","Excessive sleeping, beyond usual teenage fatigue, which could indicate depression or substance abuse; difficulty in sleeping, insomnia, and other sleep disorders","Experience isolation from friends?","Expressions of hopelessness or worthlessness","Feelings of worthlessness and/or helplessness","Have visible marks or bruises?","High risk behaviors","Impulsivity","Isolation from family members","Lack of motivation","Loss of interest in normal activities","Loss of self-esteem","Lying","Make changes in their daily rituals?","Obsessive body-image concerns","Over-reactive arguing","Paranoia and excessive secrecy","Personality shifts and changes, such as aggressiveness and excess anger that are sharply out of character and could indicate psychological, drug, or sexual problems","Poor academic performance","Poor school attendance","Purging (forced vomiting) after eating - be alert for both dramatic weight loss without changes in eating habits (which could, of course, indicate other health issues that require a doctor's attention) and also for immediate trips to the bathroom or other private spot after a meal.","Retreat from school or activities?","Secrecy","Self-mutilation (cutting)","Self-mutilation, or mention of hurting himself or herself","Show a dramatic in weight, appearance and/or grades?","Signs of hangover (bloodshot eyes, changes in pupils)","Slurred speech","Social isolation","Social isolation, abandonment of peer group","Spend excessive amounts of time in contact with the person they are dating through cell phones and computers?","Spend excessive amounts of time with the person they're dating?","Sudden changes in academic performance","Sudden mood swings","Thoughts of suicide","Tremors or impaired coordination","Unexpected and dramatic decline in academic performance","Unexpected weeping or excessive moodiness","Unexplained aches and pains","Unexplained hyperactivity","Wear clothing inappropriate for the weather (possibly to hide marks)?","Weight loss and loss of appetite, which could indicate an eating disorder","Withdrawal"]
        
        result = ['Secrecy', 'Aggressive behavior']
        result = json.load(jsonList)
        print(type(result))
        
        keys = ['weapons_or', 'stealing_or', 'fighting_or', 'drug_use_or', 'making_threats_or', 'verbal_bullying_or', 'vandalism_or', 'cyber_bullying_or', 'gang_activities_or', 'intimidation_or', 'ostracizing_or', 'sexual_harassment_or']
        
        result_vals = []
        for i in range(len(keys)):
            result_vals.append(0)
        
        for some_key in result:
            idx = trait_list.index(some_key)
            result_vals[0] = result_vals[0] + weapons_or[idx]
            result_vals[1] = result_vals[1] + stealing_or[idx]
            result_vals[2] = result_vals[2] + fighting_or[idx]
            result_vals[3] = result_vals[3] + drug_use_or[idx]
            result_vals[4] = result_vals[4] + making_threats_or[idx]
            result_vals[5] = result_vals[5] + verbal_bullying_or[idx]
            result_vals[6] = result_vals[6] + vandalism_or[idx]
            result_vals[7] = result_vals[7] + cyber_bullying_or[idx]
            result_vals[8] = result_vals[8] + gang_activities_or[idx] 
            result_vals[9] = result_vals[9] + intimidation_or[idx]
            result_vals[10] = result_vals[10] + ostracizing_or[idx]
            result_vals[11] = result_vals[11] + sexual_harassment_or[idx]
        
        result_dict = zip(keys, result_vals)
        
        prob_sum = 0
        for i in range(len(result_vals)):
            prob_sum += result_vals[i]
        
        result_probs = []
        for i in range(len(result_vals)):
            result_probs.append(result_vals[i]/prob_sum)
        
        result_prob_dict = dict(zip(keys, result_probs))
        

        
    def do_POST(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        return json.dumps(result_prob_dict)